let endpoint = 'http://localhost:3000'
$(document).ready(function () {
  renderTable()
})
const renderTable = () => {
  fetch(endpoint + '/item_data/get_item')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const table = document.getElementById('TableProduct')
      table.innerHTML = ''
      data.data.forEach(result => {
        const row = `
          <tr data-id="${result._id}">
            <td>${result.name}</td>
            <td>${result.price}</td>
            <td>${result.quantity}</td>
            <td>            
              <button type='button' class='btn btn-info btn-update' >
                Update
              </button>             
            </td>
          </tr>
        `
        table.innerHTML += row
      })

      // Add click event listener to insert button
      const insertButton = document.getElementById('insertButton')
      insertButton.addEventListener('click', () => {
        showInsertModal()
      })
      // Add click event listener to each row
      const rows = document.querySelectorAll('#TableProduct tr')
      rows.forEach(row => {
        row.addEventListener('click', () => {
          const id = row.getAttribute('data-id')
          showModal(id)
        })
      })
    })
}

const showModal = id => {
  const modal = document.getElementById('myModal')
  const modalTitle = modal.querySelector('.modal-title')
  const modalBody = modal.querySelector('.modal-body')
  const modalFooter = modal.querySelector('.modal-footer')
  modalTitle.innerHTML = 'Edit Product'
  modalFooter.innerHTML = `
    <button type='button' class='btn btn-primary btn-save'>
      Save changes
    </button>
  `
  fetch(`${endpoint}/item_data/get_item/${id}`)
    .then(response => response.json())
    .then(data => {
      modalBody.innerHTML = `
        <form id='editForm'>
        <div class='form-group'>
            <label for='_id'>ID:</label>
            <input type='text' class='form-control' disable id='_id' value='${data.data._id}'>
          </div>
          <div class='form-group'>
            <label for='name'>Name:</label>
            <input type='text' class='form-control' id='name' value='${data.data.name}'>
          </div>
          <div class='form-group'>
            <label for='price'>Price:</label>
            <input type='number' class='form-control' id='price' value='${data.data.price}'>
          </div>
          <div class='form-group'>
            <label for='quantity'>Quantity:</label>
            <input type='number' class='form-control' id='quantity' value='${data.data.quantity}'>
          </div>
          <div class='form-group'>
            <label for='description'>Description:</label>
            <input type='text' class='form-control' id='description' value='${data.data.description}'>
          </div>
        </form>
      `
      $(modal).modal('show')

      // Add click event listener to the save button
      const btnSave = modal.querySelector('.btn-save')
      btnSave.addEventListener('click', () => {
        const formData = new FormData(document.getElementById('editForm'))
        const updatedData = {
          _id: document.getElementById('_id').value,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          quantity: document.getElementById('quantity').value,
          description: document.getElementById('description').value
        }
        console.log(updatedData)
        fetch(`${endpoint}/item_data/update_item`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            $(modal).modal('hide')
            renderTable()
          })
      })
    })
}
const showInsertModal = () => {
  const modal = document.getElementById('myModal')
  const modalTitle = modal.querySelector('.modal-title')
  modalTitle.innerText = 'Add New Product'

  const modalBody = modal.querySelector('.modal-body')
  modalBody.innerHTML = `
    <form>
      <div class="form-group">
        <label for="name">Product Name:</label>
        <input type="text" class="form-control" id="name" required>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" class="form-control" id="price" required>
      </div>
      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input type="number" class="form-control" id="quantity" required>
      </div>
      <div class="form-group">
        <label for="description">description:</label>
        <input type="text" class="form-control" id="description" required>
      </div><br>
      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
  `

  const form = modalBody.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const quantity = document.getElementById('quantity').value
    const description = document.getElementById('description').value
    const body = JSON.stringify({
      name: name,
      price: price,
      quantity: quantity,
      description: description
    })
    console.log(body)

    fetch(`${endpoint}/item_data/insert_item`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => response.json())
      .then(data => {      
          renderTable()
          $(modal).modal('hide')
        
      })
  })

  $(modal).modal('show')
}
