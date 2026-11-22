document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const fio = document.getElementById('fio');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const service = document.getElementById('serviceSelect');
  const policy = document.getElementById('policy');
  const msg = document.getElementById('formMsg');

  // 
  const setError = (id, text) => { 
    document.getElementById(id).textContent = text; 
  };

  // ---
  function validateFio(v) {
    // 
    return /^[А-Яа-яЁё\s]{2,}$/.test(v.trim()) && v.trim().split(/\s+/).length >= 2;
  }
  
  function validatePhone(v) {
    // 
    return /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(v.trim());
  }
  
  function validateEmail(v) {
    // 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function validateAll() {
    let ok = true;

    if (!validateFio(fio.value)) { 
      setError('err-fio', 'Введите ФИО (кириллица, минимум имя и фамилия)'); 
      ok = false; 
    } else setError('err-fio', '');

    if (!validatePhone(phone.value)) { 
      setError('err-phone', 'Формат: +7(XXX)-XXX-XX-XX'); 
      ok = false; 
    } else setError('err-phone', '');

    if (!validateEmail(email.value)) { 
      setError('err-email', 'Некорректный email'); 
      ok = false; 
    } else setError('err-email', '');

    if (!service.value) { 
      setError('err-service', 'Выберите услугу'); 
      ok = false; 
    } else setError('err-service', '');

    if (!policy.checked) { 
      setError('err-policy', 'Необходимо согласие с политикой'); 
      ok = false; 
    } else setError('err-policy', '');

    return ok;
  }

  // ---  ---
  phone.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, ''); // Оставляем только цифры
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    digits = digits.slice(0, 11);
    
    let out = '+7';
    if (digits.length > 1) out += '(' + digits.slice(1, 4);
    if (digits.length >= 5) out += ')-' + digits.slice(4, 7);
    if (digits.length >= 8) out += '-' + digits.slice(7, 9);
    if (digits.length >= 10) out += '-' + digits.slice(9, 11);
    
    e.target.value = out;
  });

  // ---  ---
  form.addEventListener('submit', (e) => {
    e.preventDefault(); //
    msg.textContent = '';
    msg.className = 'form-msg';

    // 
    if (!validateAll()) {
      msg.textContent = 'Проверьте правильность заполнения полей';
      msg.classList.add('fail');
      return;
    }

    //  
    const data = {
      fio: fio.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      service: service.value
    };

    console.log('Отправка данных в БД:', data);

    // 
    msg.textContent = 'Вы успешно записаны на пробное занятие!';
    msg.classList.add('ok');
    form.reset(); //
  });
});