import './fortune.style.css';

const fortunes = [
  '🌞 운이 아주 좋은 날이에요!',
  '🌧️ 조심해야 할 일이 생길 수 있어요.',
  '🍀 뜻밖의 행운이 찾아올 거예요.',
  '💪 노력한 만큼 결과가 따를 거예요.',
  '🧘‍♀️ 마음의 평화를 얻을 수 있어요.',
  '🚀 새로운 기회가 곧 찾아옵니다!',
  '😴 휴식이 필요한 날이에요.',
];

const fortuneDetails = [
  `중요한 결정을 내려야 했다면 \n 오늘이 적기입니다.\n 주변의 응원도 기대해보세요.`,
  '예상치 못한 변수에 대비하세요.\n 중요한 일정은 다시 점검해보세요.',
  '낯선 제안이라도 한 번 귀 기울여 보세요.\n 좋은 기회로 이어질 수 있어요.',
  '포기하지 말고 계속 시도하세요.\n 특히 오전 시간에 성과가 클 수 있습니다.',
  '혼자만의 시간을 가지며 \n 내면의 소리를 들어보세요.\n 정리되지 않은 감정이 해결될 수 있어요.',
  '예상치 못한 연락이나 소식이 \n오늘의 흐름을 바꿔줄 수 있어요. \n열린 자세가 필요해요.',
  '몸이 보내는 신호에 귀 기울이세요. \n가벼운 산책이나 명상이 큰 도움이 될 거예요.',
];

const luckyItems = [
  '열쇠고리',
  '책',
  '텀블러',
  '손목시계',
  '볼펜',
  '운동화',
  '이어폰',
];

const luckyColors = [
  '빨간색',
  '파란색',
  '노란색',
  '초록색',
  '보라색',
  '검정색',
  '하늘색',
];

export function createFortuneComponent(container, onclose) {
  const domUI = document.getElementById('dom-ui');
  domUI.style.pointerEvents = 'auto'; // 운세창 뜰 때

  const fortuneContainer = document.createElement('div');
  fortuneContainer.className = 'fortune-container';
  container.appendChild(fortuneContainer);
  fortuneContainer.addEventListener('click', () => {
    container.removeChild(fortuneContainer);
    domUI.style.pointerEvents = 'none';
    onclose();
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'fortune-box';
  wrapper.addEventListener('click', (e) => {
    e.stopPropagation(); // fortune-box 내부 클릭 시 닫히지 않게 함
  });

  const title = document.createElement('h2');
  title.textContent = '오늘의 운세';

  const fortuneText = document.createElement('p');
  const todaySeed = getRandom();
  fortuneText.textContent = getFortune(todaySeed);

  const fortuneDetail = document.createElement('p');
  fortuneDetail.textContent = fortuneDetails[todaySeed % fortuneDetails.length];

  const itemText = document.createElement('p');
  itemText.textContent = `🎁 행운의 아이템: ${luckyItems[getRandom()]}`;

  const colorText = document.createElement('p');
  colorText.textContent = `🎨 행운의 색상: ${luckyColors[getRandom()]}`;

  const closeButton = document.createElement('button');
  closeButton.className = 'fortune-close-button'; // 스타일을 위해 클래스 추가
  closeButton.textContent = '✕';
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();

    container.removeChild(fortuneContainer);
    domUI.style.pointerEvents = 'none';
    onclose();
  });

  wrapper.appendChild(title);
  wrapper.appendChild(closeButton);
  wrapper.appendChild(fortuneText);
  wrapper.appendChild(fortuneDetail);
  wrapper.appendChild(itemText);
  wrapper.appendChild(colorText);

  fortuneContainer.appendChild(wrapper);
}

function getRandom() {
  return Math.floor(Math.random() * 7);
}

function getFortune(seed) {
  return fortunes[seed % fortunes.length];
}
