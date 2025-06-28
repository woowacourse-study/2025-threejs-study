export function createInfoUI() {
  const infoPanel = document.createElement("div");
  infoPanel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #2F4F2F;
    border-radius: 10px;
    padding: 15px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #2F4F2F;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;

  infoPanel.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px; color: #1a4a1a;">상추신과 놀기 🥬</div>
    <div style="margin-bottom: 4px;">• 상추신이 마우스를 따라 움직여요</div>
    <div style="margin-bottom: 4px;">• 상추신을 클릭해보세요</div>
    <div style="margin-bottom: 4px;">• 스크롤 & 드래그로 화면을 움직여봐요</div>
  `;

  document.body.appendChild(infoPanel);

  return infoPanel;
}
