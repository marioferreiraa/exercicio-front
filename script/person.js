$(function(){
    console.log(1)
    services.singlePerson(parseInt(new URL(location.href).search.split("=")[1]),callback);
});

const callback = (data) => {
    let dados = data.data;
    let name = dados.first_name + ' ' + dados.last_name;
    $('div.person').html('').append('<img src="'+dados.avatar+'" alt="'+name+'"/>');
    $('div.person').append('<h4>'+name+'</h4>');
}