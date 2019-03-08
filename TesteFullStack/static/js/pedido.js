
class PedidoForm{

    constructor(){
        this.produto = null;
        this.preco_real = null;
        this.multiplo = null;
    }

    mudou_produto(){
       this.atualiza_campos()
       this.mudou_preco()
    }

    mudou_preco(){
        let novo_preco = $('#id_preco').val();
        
        // Rentabilidade ótima
        if (novo_preco > this.preco_real){
            $('#id_preco')[0].setCustomValidity('');
            $('#div_rentabilidade').removeClass('alert-danger')
            $('#div_rentabilidade').addClass('alert-success')
            $('#div_rentabilidade').html('Rentabilidade ótima');
        
        // Rentabilidade ruim
        } else if (novo_preco < this.preco_real * 0.9){
            $('#id_preco')[0].setCustomValidity(`${this.produto} deve ser comprado por no mínimo ${this.preco_real * 0.9}`);
            $('#div_rentabilidade').removeClass('alert-success')
            $('#div_rentabilidade').addClass('alert-danger')
            $('#div_rentabilidade').html('Rentabilidade ruim');
        
        // Rentabilidade boa
        } else {
            $('#id_preco')[0].setCustomValidity('');
            $('#div_rentabilidade').removeClass('alert-danger');
            $('#div_rentabilidade').addClass('alert-success');
            $('#div_rentabilidade').html('Rentabilidade boa');
        }
    }

    mudou_quantidade(){
        let quantidade = $('#id_quantidade').val();

        // Quantidade inválida
        if ( quantidade < 1 ){
            $('#id_quantidade')[0].setCustomValidity(`Quantidade de ${this.produto} deve ser maior que zero`);
        }
        
        // Quantidade não é múltiplo
        else if (this.multiplo != null && quantidade % this.multiplo != 0){        
            $('#id_quantidade')[0].setCustomValidity(`Quantidade de ${this.produto} deve ser múltiplo de ${this.multiplo}`);
        
        // Quantidade válida    
        } else {
            $('#id_quantidade')[0].setCustomValidity('');
        }
    }    

    // Ajax que busca informações do produto selecionado
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

    // função chamada sempre que altera o produto
    atualiza_campos(){
        this.produto_selecionado( data => {
            // chama o ajax e armazena as informações do produto nos atributos da classe
            this.produto = data.nome;
            this.preco_real = data.preco;
            this.multiplo = data.multiplo;

            // atualiza os campos preço e quantidade com o padrão obtido do produto
            $('#id_preco').val(data.preco);
            $('#id_quantidade').val(data.multiplo);
            if(data.multiplo == null)
                $('#id_quantidade').val(1);    
        });
    }



}


