let atualPage = 1;
let lastPage;

$(function(){
    services.lista(1, callbackLista);

    $(document).on('click','.btn-numbers', function(){
        if(!$(this).is('disabled')){
            services.lista(parseInt($(this).text()),callbackLista);
            $('.btn-numbers').removeClass('disabled');
        }
    });

    $('.btn-first').on('click', function(){
        services.lista(1, callbackLista);
    });

    $('.btn-prev').on('click', function(){
        services.lista(atualPage - 1, callbackLista);
    });

    $('.btn-next').on('click', function(){
        services.lista(atualPage + 1, callbackLista);
    });

    $('.btn-last').on('click', function(){
        services.lista(lastPage, callbackLista);
    });

});

const callbackLista = (data) => {
    
    let itens = data.data;
    let bodyTable = '';
    atualPage = data.page;
    lastPage = data.total_pages;
    for(let i = 0; i < itens.length; i++){
        bodyTable += '<tr>'+
                        '<th scope="row">'+itens[i].id+'</th>'+
                        '<td>'+itens[i].first_name+'</td>'+
                        '<td>'+itens[i].last_name+'</td>'+
                        '<td><a href="person.html?id='+itens[i].id+'">Show More</a></td>'+
                    '</tr>';
    }
    
    $('.table-striped tbody').html('').append(bodyTable);
    $('.btn-pags').html('');
    
    for(let i = 1; i <= data.total_pages; i++){
        $('.btn-pags').append('<button id="pag-'+i+'" class="btn-numbers">'+i+'</button>');
    }
    
    $('#pag-'+data.page).attr('disabled', true);

    if(data.page == data.total_pages){
        $('.button-right button').attr('disabled', true);
    }else{
        $('.button-right button').removeAttr('disabled');
    }

    if(data.page == 1){
        $('.button-left button').attr('disabled', true);
    }else{
        $('.button-left button').removeAttr('disabled');
    }
}