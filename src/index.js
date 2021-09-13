import './sass/main.scss';
import createMarkup from './templates/markup-tpl.hbs';
import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const refs = {
  form: document.querySelector('#form'),
  searchField: document.querySelector('#search'),
  container: document.querySelector('.container'),
  loadMore: document.querySelector('#more'),
};
let currentPage = 1;

const onSubmit = e => {
  e.preventDefault();
  const submitValue = refs.searchField.value;
  const baseApi = 'https://api.github.com';
  const myGitId = '67a962bb74ca1bbfdc52';
  const secretClient = '806def03bea1bb0c19b5389bde86a3ff499a2200';
  axios
    .get(
      `${baseApi}/search/repositories?q=${submitValue}&client_id=${myGitId}&client_secret=${secretClient}&page=${currentPage}`,
    )
    .then(result => renderCollection(result.data.items))
    .then(() => currentPage++)
    .catch(err => console.log(err));
};

function renderCollection(arr) {
  arr.forEach(el => {
    refs.container.insertAdjacentHTML('beforeend', createMarkup(el));
  });
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onSubmit);

// // takoe senbe------------------------------------------
// $('#pagination-container').pagination({
//   dataSource: [1, 2, 3, 4, 5, 6, 7, ...  195],
//   callback: function(data, pagination) {
//       // template method of yourself
//       var html = template(data);
//       $('#data-container').html(html);
//   }
// })

// $(document).ready(function(){
//   alert(jQuery.fn.jquery);
//   });

// const pagination = new Pagination('pagination');
const options = {
  totalItems: 1000,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  },
  
};

const pagination = new Pagination('pagination', options);
console.log(pagination);

var pagination2 = new tui.Pagination(document.getElementById('pagination2'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true
});

