// Shared script for bekrow.ca and bekrow.ca/residential/

// Web3Forms access key. Leave empty to fall back to opening the visitor's email app.
const FORM_KEY = "609d2eac-eb89-4d78-970a-8047b0c5743f";
const EMAIL = "bayram@bekrow.ca";

document.getElementById('yr').textContent = new Date().getFullYear();

// Menu
const menu = document.getElementById('menu'), scrim = document.querySelector('.scrim'), burger = document.querySelector('.burger');
function setMenu(open){
  menu.classList.toggle('open', open); scrim.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open)); burger.setAttribute('aria-expanded', String(open));
  if (open) menu.querySelector('a').focus();
}
burger.addEventListener('click', () => setMenu(true));
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Quote form. The form's data-subject attribute sets the email subject.
const form = document.getElementById('quote-form'), status = form.querySelector('.form-status');
const subject = form.dataset.subject || 'New quote request from bekrow.ca';
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  if (data.botcheck) return;
  delete data.botcheck;
  if (!FORM_KEY) {
    const labels = {name:'Name', company:'Company', email:'Email', phone:'Phone', project_type:'Project type', location:'Location'};
    const body = Object.keys(labels).filter(k => k in data).map(k => `${labels[k]}: ${data[k]}`).join('\n') + '\n\n' + data.message;
    location.href = `mailto:${EMAIL}?subject=` + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.textContent = `Your email app should open with the details filled in. If it does not, email ${EMAIL} directly.`;
    return;
  }
  status.textContent = 'Sending…';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({...data, access_key: FORM_KEY, subject, from_name: 'bekrow.ca'})
    });
    const json = await res.json();
    if (json.success) { form.reset(); status.textContent = "Thanks. We'll be in touch within one business day."; }
    else throw new Error(json.message);
  } catch (err) {
    status.textContent = `Something went wrong. Please email ${EMAIL} or call 587-969-5701.`;
  }
});
