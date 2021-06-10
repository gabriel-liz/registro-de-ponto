import { AbstractControl } from '@angular/forms';

export class CnpjValidator{

    static validate(control: AbstractControl): {[key: string]: boolean}{
        if(this.cnpjValido(control.value)){
            return null;
        }
        return {'cnpj': true };
    
    }

    static cnpjValido(cnpj:any): boolean {
        cnpj = !cnpj || cnpj.replace(/\D/g, '');

        let cnpjsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;

        if (!cnpj || cnpj.length !== 14 || cnpjsInvsRegex.test(cnpj)){
            return false;
        }

        let tamanho = cnpj.length -2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho -7;

        for (let i = tamanho; i >= 1; i --){
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos <2){
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0), 10)){
            return false;
        }

        tamanho += 1;
        numeros = cnpj.substring(0, tamanho)
        soma =0;
        pos = tamanho - 7;

        for (let i = tamanho; i >=1; i--){
            soma += numeros.charAt(tamanho - i) * pos--;
            if(pos < 2){
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        return(resultado === parseInt(digitos.charAt(1), 10));
    }
}

