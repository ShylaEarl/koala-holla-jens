console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  $("#viewKoalas").empty();
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koala'
  }).then(function(response) {
    console.log(response);
    for(let i = 0; i < response.length; i += 1) {
      let koala = response[i];
      // For each book, append a new row to our table
      $('#viewKoalas').append(`
        <tr>
          <td>${koala.name}</td>
          <td>${koala.gender}</td>
          <td>${koala.age}</td>
          <td>${koala.readyForTransfer}</td>
          <td>${koala.notes}</td>
          <td><button class="transfer-koala" data-id="${koala.id}">Transfer</button></td>
          <td><button class="remove-koala" data-id="${book.id}">Remove Koala</button></td>
        </tr>
      `);
    }//end for loop
    //renderKoalas(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
