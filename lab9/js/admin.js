window.isOnline = () => this.navigator.onLine;

const getById = id => document.getElementById(id);

const input_form = getById('addPicture');
const newsForm = getById('newsForm');
const text = getById('text');
const caption = getById('caption');
const fileInput = getById('formForFile');

const onSubmitPress = (e) => {
  e.preventDefault();

  const isValid = (text.value.length > 0 && caption.value.length > 0);
  input_form.classList.add('was-validated')
  newsForm.classList.add('was-validated');

  if (!isValid) return;

  if (!isOnline()) {
    writeLocally({
      title: caption.value,
      body: text.value,
      picture: fileInput.value,
    });
  } else {
    console.log('Емуляція запиту до сервера...');
  }

  input_form.classList.remove('was-validated');
  newsForm.classList.remove('was-validated');
  input_form.reset();
  newsForm.reset();

  alert('Вашу новину додано!');
}


function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#example_picture').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
};


$("#formForFile").change(function() {
  readURL(this);
});


const writeLocally = (obj) => {
  const items = localStorage.getItem('news_data')
  let data = items ? JSON.parse(items) : [];
  data.push(obj);
  localStorage.setItem('news_data', JSON.stringify(data));
};


const addButton = getById('submit-btn');
addButton.onclick = onSubmitPress;