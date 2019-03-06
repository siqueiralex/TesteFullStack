
class PedidoForm{

    constructor(){
        this.produto = null;
        this.preco_real = null;
        this.multiplo = null;
    }

    mudou_produto(){
       this.atualiza_campos()
    }

    mudou_preco(){
        let novo_preco = $('#id_preco').val();
        if (novo_preco > this.preco_real){
            $('#id_preco')[0].setCustomValidity('');
            $('#div_rentabilidade').removeClass('alert-danger')
            $('#div_rentabilidade').addClass('alert-success')
            $('#div_rentabilidade').html('Rentabilidade ótima');
        } else if (novo_preco < this.preco_real * 0.9){
            $('#id_preco')[0].setCustomValidity(`${this.produto} deve ser comprado por no mínimo ${this.preco_real * 0.9}`);
            $('#div_rentabilidade').removeClass('alert-success')
            $('#div_rentabilidade').addClass('alert-danger')
            $('#div_rentabilidade').html('Rentabilidade ruim');
        } else {
            $('#id_preco')[0].setCustomValidity('');
            $('#div_rentabilidade').removeClass('alert-danger');
            $('#div_rentabilidade').addClass('alert-success');
            $('#div_rentabilidade').html('Rentabilidade boa');
        }
    }

    mudou_quantidade(){
        let quantidade = $('#id_quantidade').val();
        if ( quantidade < 1 ){
            $('#id_quantidade')[0].setCustomValidity(`Quantidade de ${this.produto} deve ser maior que zero`);
        }
        
        else if (this.multiplo != null && quantidade % this.multiplo != 0){        
            $('#id_quantidade')[0].setCustomValidity(`Quantidade de ${this.produto} deve ser múltiplo de ${this.multiplo}`);
        
        } else {
            $('#id_quantidade')[0].setCustomValidity('');
        }
    }    

    produto_selecionado(callback){
        $.ajax({
            type: 'POST',
            url: "/produto/",
            data: {
                csrfmiddlewaretoken: window.CSRF_TOKEN,
                id: $('#id_produto').val()
            },
            success: function(data) {
               callback(data);
            }
        });
    }

    atualiza_campos(){
        this.produto_selecionado( data => {
            this.produto = data.nome;
            this.preco_real = data.preco;
            this.multiplo = data.multiplo;
            $('#id_preco').val(data.preco);
            $('#id_quantidade').val(data.multiplo);
            if(data.multiplo == null)
                $('#id_quantidade').val(1);    
        });
    }



}


