// Set or ask for user's name (stored in localStorage)
(function(){
  const nameEl = document.getElementById('userName');
  try{
    const saved = localStorage.getItem('laundry_user') || '';
    if(saved){
      nameEl.textContent = saved;
    } else {
      const name = prompt('Please enter your name (optional):','Guest');
      if(name === null){
        // user cancelled prompt — show default but don't save
        nameEl.textContent = 'Guest';
      } else if(name && name.trim() !== ''){
        const n = name.trim();
        localStorage.setItem('laundry_user', n);
        nameEl.textContent = n;
      } else {
        // empty entry — ensure no saved value and show Guest
        localStorage.removeItem('laundry_user');
        nameEl.textContent = 'Guest';
      }
    }
  }catch(e){console.warn('Could not access localStorage')}
})();

// Allow user to change their name by clicking it
const nameEl = document.getElementById('userName');
if(nameEl){
  // make it discoverable
  nameEl.style.cursor = 'pointer';
  nameEl.title = 'Click to edit your name';

  nameEl.addEventListener('click', ()=>{
    const current = localStorage.getItem('laundry_user') || '';
    const newName = prompt('Please enter your name (leave blank to reset to Guest):', current || '');
    if(newName === null){
      // user cancelled — do nothing
      return;
    }
    if(newName.trim() !== ''){
      const n = newName.trim();
      localStorage.setItem('laundry_user', n);
      nameEl.textContent = n;
    } else {
      // explicit empty input — reset to Guest
      localStorage.removeItem('laundry_user');
      nameEl.textContent = 'Guest';
    }
  });
}

// Book button behaviour
document.getElementById('bookBtn').addEventListener('click', function(){
  const name = localStorage.getItem('laundry_user') || 'Guest';
  alert(`Thanks ${name}! We'll contact you to confirm your booking.`);
});

// Mobile toggle for nav links (small screens)
const toggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');
if(toggle){
  toggle.addEventListener('click', ()=>{
    if(navLinks.style.display === 'flex'){
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.right = '28px';
      navLinks.style.background = 'white';
      navLinks.style.padding = '12px';
      navLinks.style.boxShadow = '0 8px 24px rgba(2,6,23,0.08)';
      navLinks.style.borderRadius = '10px';
    }
  });
}