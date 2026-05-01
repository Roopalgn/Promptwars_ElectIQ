import { scenarios } from '../data/scenarios.js';
import { askGemini } from '../api/gemini.js';
import { marked } from 'marked';
import { t } from '../utils/i18n.js';

export function renderSimulator(container) {
  let activeScenario = null;
  let currentNodeId = null;
  let path = [];

  const renderScenarioList = () => {
    container.innerHTML = `
      <div class="section-header reveal">
        <h2>Interactive Scenario Simulator</h2>
        <p>Explore real-world election edge cases. What happens if...</p>
      </div>
      <div class="scenario-grid reveal">
        ${Object.values(scenarios).map(s => `
          <div class="glass-card scenario-card" data-id="${s.id}">
            <div class="scenario-icon">${s.icon}</div>
            <div class="scenario-content">
              <h3 style="margin-bottom: var(--space-2);">${s.title}</h3>
              <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">${s.description}</p>
              <button class="btn btn-primary" style="margin-top: auto;">Simulate ➔</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.scenario-card').forEach(card => {
      card.addEventListener('click', () => {
        startScenario(card.dataset.id);
      });
    });
  };

  const startScenario = (id) => {
    activeScenario = scenarios[id];
    currentNodeId = activeScenario.start_node;
    path = [];
    renderNode();
  };

  const renderNode = () => {
    const node = activeScenario.nodes[currentNodeId];
    path.push(currentNodeId);

    // Build breadcrumbs
    const breadcrumbs = path.map((n, i) => `<span class="crumb ${i === path.length-1 ? 'active' : ''}">Step ${i+1}</span>`).join(' > ');

    const severityColor = node.severity === 'critical' ? 'var(--color-danger)' : node.severity === 'warning' ? 'var(--color-warning)' : 'var(--color-success)';

    container.innerHTML = `
      <div class="simulator-layout reveal">
        <div class="simulator-main">
          <button class="btn btn-secondary" id="back-to-sims" style="margin-bottom: var(--space-4);">← Back to Scenarios</button>
          <div class="simulator-breadcrumbs">${breadcrumbs}</div>
          
          <div class="glass-card simulator-view" style="border-top: 4px solid ${severityColor};">
            <div class="severity-badge ${node.severity}">${node.severity.toUpperCase()}</div>
            <h3 class="simulator-message" style="margin-bottom: var(--space-4); margin-top: var(--space-4);">${node.message}</h3>
            
            <div class="simulator-ai-help" style="margin-bottom: var(--space-6);">
              <button class="btn btn-secondary" id="ask-ai-btn" style="padding: 6px 12px; font-size: var(--text-sm);">🤖 Explain this simply</button>
              <div id="ai-explanation" style="display:none; margin-top: var(--space-3); padding: var(--space-4); background: var(--bg-elevated); border-radius: var(--radius-md); font-size: var(--text-sm); border: 1px solid var(--border-subtle);"></div>
            </div>

            <div class="simulator-options">
              <h4 style="margin-bottom: var(--space-3); font-size: var(--text-sm); color: var(--text-muted); text-transform: uppercase;">Your Options</h4>
              ${node.options.map((opt, i) => `
                <button class="btn btn-primary simulator-option-btn w-full" style="margin-bottom: var(--space-3); width: 100%; display: block; text-align: left; height: auto; padding: 16px;" data-next="${opt.next || ''}">
                  ${opt.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="simulator-sidebar">
          <div class="glass-card outcome-panel">
            <h4 style="margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-2);">Outcome Panel</h4>
            
            ${node.deadline ? `
              <div class="outcome-section" style="margin-bottom: var(--space-4);">
                <h5 style="color: var(--color-primary-light); margin-bottom: var(--space-2); display:flex; align-items:center; gap:8px;">⏳ Deadline</h5>
                <p style="font-size: var(--text-sm); color: var(--text-secondary);">${node.deadline}</p>
              </div>
            ` : ''}
            
            ${node.consequences && node.consequences.length > 0 ? `
              <div class="outcome-section" style="margin-bottom: var(--space-4);">
                <h5 style="color: var(--color-danger); margin-bottom: var(--space-2); display:flex; align-items:center; gap:8px;">⚠️ Consequences</h5>
                <ul style="padding-left: 20px; font-size: var(--text-sm); color: var(--text-secondary);">${node.consequences.map(c => `<li style="margin-bottom:4px;">${c}</li>`).join('')}</ul>
              </div>
            ` : ''}
            
            ${node.recovery && node.recovery.length > 0 ? `
              <div class="outcome-section" style="margin-bottom: var(--space-4);">
                <h5 style="color: var(--color-success); margin-bottom: var(--space-2); display:flex; align-items:center; gap:8px;">🛠️ Recovery Steps</h5>
                <ol style="padding-left: 20px; font-size: var(--text-sm); color: var(--text-secondary);">${node.recovery.map(r => `<li style="margin-bottom:4px;">${r}</li>`).join('')}</ol>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    container.querySelector('#back-to-sims').addEventListener('click', renderScenarioList);

    container.querySelectorAll('.simulator-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const nextId = e.currentTarget.dataset.next;
        if (nextId && nextId !== 'null') {
          currentNodeId = nextId;
          renderNode();
        } else {
          renderFinish();
        }
      });
    });

    const askAiBtn = container.querySelector('#ask-ai-btn');
    const aiExp = container.querySelector('#ai-explanation');
    askAiBtn.addEventListener('click', async () => {
      askAiBtn.disabled = true;
      askAiBtn.innerText = '🤖 Thinking...';
      try {
        const prompt = `Explain the following election scenario in simple terms for a first-time voter in India. Be concise. State data: "${node.message}"`;
        const result = await askGemini(prompt);
        aiExp.style.display = 'block';
        aiExp.innerHTML = marked.parse(result);
        askAiBtn.style.display = 'none';
      } catch (e) {
        aiExp.style.display = 'block';
        aiExp.innerHTML = 'Error fetching AI explanation. Check console.';
        askAiBtn.disabled = false;
        askAiBtn.innerText = '🤖 Try again';
        console.error(e);
      }
    });
  };

  const renderFinish = () => {
    container.innerHTML = `
      <div class="glass-card text-center reveal" style="max-width: 600px; margin: 40px auto; padding: var(--space-8);">
        <h2 style="margin-bottom: var(--space-4);">🏁 Simulation Complete</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">You have successfully navigated this scenario.</p>
        <button class="btn btn-primary" id="restart-sim">Explore Another Scenario</button>
      </div>
    `;
    container.querySelector('#restart-sim').addEventListener('click', renderScenarioList);
  };

  renderScenarioList();
  
  return {
    rerender: renderScenarioList
  };
}
