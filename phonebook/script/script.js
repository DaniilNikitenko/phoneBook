'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const addContactData = (contact) => {
    data.push(contact);
    console.log(data);
  };
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGrout = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
        'beforeend',
        `
	  <tr>
		<th class="delete">Удалить</th>
		<th class ="name">Имя</th>
		<th class ="surname">Фамилия</th>
		<th class ="table-heading">Телефон</th>
	  </tr>
	`,
    );

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML(
        'beforeend',
        `
		<button class="close" type="button"></button>
		<h2 class="form-title">Добавить контакт</h2>
		<div class="form-group">
		  <label class="form-label" for="name">Имя:</label>
		  <input class="form-input" name="name" id="name" type="text" required>
		</div>
		<div class="form-group">
		  <label class="form-label" for="surname">Фамилия:</label>
		  <input class="form-input" name="surname"
		    id="surname" type="text" required>
		</div>
		<div class="form-group">
		  <label class="form-label" for="phone">Телефон:</label>
		  <input class="form-input" name="phone" id="phone" type="number" required>
		</div>
	`,
    );

    const buttonGroup = createButtonsGrout([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.type = 'button';

    const iconButton = document.createElement('img');
    iconButton.src = 'phonebook/img/edit.png';
    iconButton.classList.add('edit-img');

    editButton.append(iconButton);
    tdEdit.append(editButton);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;
    const footerText = document.createElement('p');
    footerText.classList.add('footer__text');
    footerText.textContent = `Все права защищены ${title}`;

    footer.footerContainer.append(footerText);
    return footer;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        logo.textContent = element.phoneLink.textContent;
      });
      element.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', (e) => {
      if (e.target.closest('.del-icon')) {
        e.target.closest('.contact').remove();
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      console.log(formData);
      console.log(newContact);
      addContactPage(newContact, list);
      addContactData(newContact);

      form.reset();
      closeModal();
    });
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter(title);
    const buttonGroup = createButtonsGrout([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      tableHead: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {list, tableHead, logo, btnAdd, btnDel, formOverlay, form} =
      renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);

    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    tableHead.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('name')) {
        data.sort((a, b) => a.name.localeCompare(b.name));
        list.innerHTML = '';
        renderContacts(list, data);
      } else if (target.classList.contains('surname')) {
        data.sort((a, b) => a.surname.localeCompare(b.surname));
        list.innerHTML = '';
        renderContacts(list, data);
      }
    });
  };

  window.phoneBookInit = init;
}
