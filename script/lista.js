let atualPage = 1;
let lastPage;
let atualData;

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

    $('.ordenar-id').on('click', function(){
        let _t = $(this);
        if(_t.hasClass('asc')){
            _t.removeClass('asc').addClass('desc');
            montaTabela(atualData.data.sort((a,b) => {
                if (a.id < b.id) { return 1; }
                if (a.id > b.id) { return -1; }
                return 0;
            }));
        }else{
            _t.removeClass('desc').addClass('asc');
            montaTabela(atualData.data.reverse((a,b) => {
                if (a.id < b.id) { return 1; }
                if (a.id > b.id) { return -1; }
                return 0;
            }));
        }
    });

    $('.ordenar-nome').on('click', function(){
        let _t = $(this);
        if(_t.hasClass('asc')){
            _t.removeClass('asc').addClass('desc');
            montaTabela(atualData.data.sort(function(a,b){
                return b.first_name.localeCompare(a.first_name);
            }));
        }else if(_t.hasClass('desc')){
            _t.removeClass('desc').addClass('asc');
            montaTabela(atualData.data.sort(function(a,b){
                return a.first_name.localeCompare(b.first_name);
            }));
        }
    });

});

const callbackLista = (obj) => {
    atualData = obj;
    let itens = obj.data;
    montaTabela(itens);
}

const montaTabela = (itens) => {
    let bodyTable = '';
    atualPage = atualData.page;
    lastPage = atualData.total_pages;
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
    
    for(let i = 1; i <= lastPage; i++){
        $('.btn-pags').append('<button id="pag-'+i+'" class="btn-numbers">'+i+'</button>');
    }
    
    $('#pag-'+atualPage).attr('disabled', true);

    if(atualPage == lastPage){
        $('.button-right button').attr('disabled', true);
    }else{
        $('.button-right button').removeAttr('disabled');
    }

    if(atualPage == 1){
        $('.button-left button').attr('disabled', true);
    }else{
        $('.button-left button').removeAttr('disabled');
    }
}

