console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();

  $('#viewKoalas').on('click','.remove-koala', deleteKoalasHandler);
  $('#viewKoalas').on('click', '.transfer-koala', transferKoalasHandler);
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
    //empties inputs on DOM
    $('#nameIn').val('');
    $('#ageIn').val('');
    $('#genderIn').val('');
    $('#readyForTransferIn').val('');
    $('#notesIn').val('');
  }); 
  
}

function getKoalas(){
  console.log( 'in getKoalas' );
  $("#viewKoalas").empty();
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response) {
    console.log(response);
    for(let i = 0; i < response.length; i += 1) {
      let koala = response[i];
      // For each book, append a new row to our table
      if(koala.ready_to_transer == 'False') {
      $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transer}</td>
          <td>${koala.notes}</td>
          <td><button class="transfer-koala" data-id="${koala.id}">Transfer</button></td>
          <td><button class="remove-koala" data-id="${koala.id}">Remove Koala</button></td>
        </tr>
      `);
      } else {
        $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.age}</td>
          <td>${koala.gender}</td>
          <td>${koala.ready_to_transer}</td>
          <td>${koala.notes}</td>
          <td></td>
          <td><button class="remove-koala" data-id="${koala.id}">Remove Koala</button></td>
        </tr>
      `);
      }

    }//end for loop
    //renderKoalas(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to save koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
    }).then(response => {
      console.log(`Response from server `, newKoala);
      // TODO Setup renderKoalas function
      // renderKoalas()
      //getKoalas renders new koala input from DOM to Table
      getKoalas();
    }).catch(error => {
      console.log(`Error in POST `, error);
      alert('Unable to add Koalas!')
    });

  }

function transferKoalas(koalaId) {
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaId}`,
    data: koalaId
  })
  .then(response => {
    console.log(response);

    getKoalas();
  })
  .catch(error => {
    console.log('Error updating Koalas', error);
  })
}

function transferKoalasHandler(){
  transferKoalas($(this).data("id"));
}


// Adding Delete 
function deleteKoala(koalaId) {
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  })
    .then(function (response) {
      getKoalas();
    })
    .catch(function (error) {
      alert('Error on killing koala.', error);
    })
}

function deleteKoalasHandler() {
  deleteKoala($(this).data("id"));
}

