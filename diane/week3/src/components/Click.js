import './click.style.css';
const Click = () => {
  const domUi = document.getElementById('dom-ui');

  const clickText = document.createElement('div');
  domUi.appendChild(clickText);
  clickText.className = 'click-text';
  clickText.textContent = 'Keep clicking for a fortune!';
};

export default Click;
