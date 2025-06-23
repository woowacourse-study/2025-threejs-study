function createShrinkingCircle({
  container,
  startSize = 200,
  endSize = 60,
  duration = 2000,
  onHit,
}) {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  container.appendChild(circle);

  let startTime = null;

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentSize = startSize - (startSize - endSize) * progress;

    circle.style.width = `${currentSize}px`;
    circle.style.height = `${currentSize}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      onHit?.('miss');
      circle.remove();
    }
  };

  circle.addEventListener('click', () => {
    const size = parseFloat(circle.style.width);
    const diff = Math.abs(size - endSize);
    if (diff < 10) {
      onHit?.('perfect');
    } else {
      onHit?.('miss');
    }
    circle.remove();
  });

  requestAnimationFrame(animate);
}

export default createShrinkingCircle;
