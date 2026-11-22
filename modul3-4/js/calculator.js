document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  if (!form) return;

  const serviceSelect = document.getElementById('service');
  const countSelect = document.getElementById('count');
  const totalElement = document.getElementById('total');
  const tariffRadios = form.querySelectorAll('input[name="tariff"]');

  //
  const prices = {
    yoga:       [600, 650, 700],
    stretching: [500, 550, 600],
    jumping:    [650, 700, 750],
    pilates:    [560, 600, 660]
  };

  function calculate() {
    const service = serviceSelect.value;
    
    // 
    if (!service) {
      totalElement.textContent = '0';
      return;
    }

    const count = parseInt(countSelect.value);
    
    // 
    let tariffIndex = 0;
    tariffRadios.forEach((radio, index) => {
      if (radio.checked) tariffIndex = index;
    });

    // 
    const pricePerClass = prices[service][tariffIndex];
    
    // 
    const total = pricePerClass * count;
    
    // 
    totalElement.textContent = total;
  }

  // 
  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  
  // 
  calculate();
});