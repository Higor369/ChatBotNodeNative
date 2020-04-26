const assert = require('assert');
const mongoDb = require('../../infra/mongo');

class CapturaDeDados{

    constructor(){
        this.mongoClient = new mongoDb();
        this.mongoClient.getConnection().then(arg=>{
        this.db = arg;
    })
}

defaultName = function(question='') {
	let nome = '';
	const fs = require('fs');
	const data = fs.readFileSync('./names.csv', 'utf8');
	const names = data.toString().trim().split(',');
	let tempName = '';
	let tempIndex = Infinity;
	for(let i=0; i<names.length; i++) {
		let name = names[i].toString().trim();
		let indexStart = question.indexOf(name);
		if(indexStart>=0) {
			if((name!=tempName)&&(indexStart<tempIndex)) {
				tempName = name;
				tempIndex = indexStart;

				let index1 = question.indexOf(' e '); if((index1<0)||(index1<indexStart)) index1 = Infinity;
				let index2 = question.indexOf(' é '); if((index2<0)||(index2<indexStart)) index2 = Infinity;
				let index3 = question.indexOf(','); if((index3<0)||(index3<indexStart)) index3 = Infinity;
				let index4 = question.indexOf(';'); if((index4<0)||(index4<indexStart)) index4 = Infinity;
				let index5 = question.indexOf('.'); if((index5<0)||(index5<indexStart)) index5 = Infinity;
				let indexEnd = [
					Math.abs(index1-indexStart),
					Math.abs(index2-indexStart),
					Math.abs(index3-indexStart),
					Math.abs(index4-indexStart),
					Math.abs(index5-indexStart)
				].sort((a, b) => a - b)[0]+indexStart;
				if(indexEnd<indexStart) indexEnd = question.length;
				if(indexEnd<0) indexEnd = question.length;
				nome = question.substring(indexStart, indexEnd);
				nome = nome.replace(/ é /g, '');
				nome = nome.replace(/:/g, '');
				nome = nome.replace(/[0-9]/g, '').trim();			
			}
		}
	}
	return nome.trim();
}
getDocuments = function(question='', code_user=-1) {
	question = question.toString().trim();

	let _nome = this.getName(question);
	let _idade = this.getYears(question);
	let _email = '';
	let _celular = '';
	let _telefone = '';
	let _cep = '';
	let _endereco = this.getEndereco(question);
	let _bairro = this.getBairro(question);
	let _numero = '';
	let _cpf = '';
	let _cnpj = '';

	const questionTokens = question.split(' ');
	for(let i=0; i<questionTokens.length; i++) {
		let word = questionTokens[i].toString().trim();

		if(word.length>=1) {
			if(_email.length<=0) _email = this.email(word);
			if(_celular.length<=0) _celular = this.celular(word);
			if(_telefone.length<=0) _telefone = this.telefone(word);
			if(_cep.length<=0) _cep = this.cep(word);
			if(_numero.length<=0) _numero = this.numero(word, question);
			if(_cpf.length<=0) _cpf = this.cpf(word);
			if(_cnpj.length<=0) _cnpj = this.cnpj(word);
		}
	}

	let objJSON = {};
	if(code_user>0) objJSON.code_user = code_user; else objJSON.code_user = -1;
	if(_nome.length>0) objJSON.nome = _nome; else objJSON.nome = '';
	if(_idade.length>0) objJSON.idade = Number(_idade); else objJSON.idade = '';
	if(_email.length>0) objJSON.email = _email; else objJSON.email = '';
	if(_celular.length>0) objJSON.celular = Number(_celular); else objJSON.celular = '';
	if(_telefone.length>0) objJSON.telefone = Number(_telefone); else objJSON.telefone = '';
	if(_cep.length>0) objJSON.cep = Number(_cep); else objJSON.cep = '';
	if(_endereco.length>0) objJSON.endereco = _endereco; else objJSON.endereco = '';
	if(_bairro.length>0) objJSON.bairro = _bairro; else objJSON.bairro = '';
	if(_numero.length>0) objJSON.numero = Number(_numero); else objJSON.numero = '';
	if(_cpf.length>0) objJSON.cpf = Number(_cpf); else objJSON.cpf = '';
	if(_cnpj.length>0) objJSON.cnpj = Number(_cnpj); else objJSON.cnpj = '';
	objJSON.activate = 1;

	if((_nome.length>0)||
	   (_idade.length>0)||
	   (_email.length>0)||
	   (_celular.length>0)||
	   (_telefone.length>0)||
	   (_cep.length>0)||
	   (_endereco.length>0)||
	   (_bairro.length>0)||
	   (_numero.length>0)||
	   (_cpf.length>0)||
	   (_cnpj.length>0)) {
		const collection = db.collection('documents');
		collection.insertOne(objJSON);
		return true;
	}else return false;
}

    getEndereco = function(question='') {
        question = question.toString().trim();
        let endereco = '';
        let start = '';
        if(question.indexOf('Endereço')>=0) start = 'Endereço';
        if(question.indexOf('Rua')>=0) start = 'Rua';
        if(question.indexOf('R.')>=0) start = 'R.';
        if(question.indexOf('Avenida')>=0) start = 'Avenida';
        if(question.indexOf('Av.')>=0) start = 'Av.';
        if(question.indexOf('Travessa')>=0) start = 'Travessa';
    
        if(start.length>0) {
            let indexStart = question.indexOf(start);
    
            let index1 = question.indexOf(' e '); if((index1<0)||(index1<indexStart)) index1 = Infinity;
            let index2 = question.indexOf(','); if((index2<0)||(index2<indexStart)) index2 = Infinity;
            let index3 = question.indexOf(';'); if((index3<0)||(index3<indexStart)) index3 = Infinity;
            let index4 = question.indexOf('.'); if((index4<0)||(index4<indexStart)) index4 = Infinity;
            let index5 = question.indexOf('-'); if((index5<0)||(index5<indexStart)) index5 = Infinity;
            let indexEnd = [
                Math.abs(index1-indexStart),
                Math.abs(index2-indexStart),
                Math.abs(index3-indexStart),
                Math.abs(index4-indexStart),
                Math.abs(index5-indexStart)
            ].sort((a, b) => a - b)[0]+indexStart;
            if(indexEnd<indexStart) indexEnd = question.length;
            endereco = question.substring(indexStart, indexEnd);
            endereco = endereco.replace(/ é /g, '').trim();
    
            let carac = '';
            index1 = endereco.indexOf(' e '); if(index1>=0) carac = ' e ';
            index2 = endereco.indexOf(','); if(index2>=0) carac = ',';
            index3 = endereco.indexOf(';'); if(index3>=0) carac = ';';
            index4 = endereco.indexOf('.'); if(index4>=0) carac = '.';
            index5 = endereco.indexOf('-'); if(index5>=0) carac = '-';
            let arrEndereco = endereco.split(carac);
            endereco = arrEndereco[0].toString().trim();
        }
        return endereco;
    }
    
     getBairro = function(question='') {
        question = question.toString().trim();
        let bairro = '';
        let start = '';
        if(question.indexOf('Bairro')>=0) start = 'Bairro';
    
        if(start.length>0) {
            let indexStart = question.indexOf(start)+start.length+1;
    
            let index1 = question.indexOf(' e '); if((index1<0)||(index1<indexStart)) index1 = Infinity;
            let index2 = question.indexOf(','); if((index2<0)||(index2<indexStart)) index2 = Infinity;
            let index3 = question.indexOf(';'); if((index3<0)||(index3<indexStart)) index3 = Infinity;
            let index4 = question.indexOf('.'); if((index4<0)||(index4<indexStart)) index4 = Infinity;
            let index5 = question.indexOf('-'); if((index5<0)||(index5<indexStart)) index5 = Infinity;
            let indexEnd = [
                Math.abs(index1-indexStart),
                Math.abs(index2-indexStart),
                Math.abs(index3-indexStart),
                Math.abs(index4-indexStart),
                Math.abs(index5-indexStart)
            ].sort((a, b) => a - b)[0]+indexStart;
            if(indexEnd<indexStart) indexEnd = question.length;
            bairro = question.substring(indexStart, indexEnd);
            bairro = bairro.replace(/:/g, '')
            bairro = bairro.replace(/ é /g, '').trim();
    
            let carac = '';
            index1 = bairro.indexOf(' e '); if(index1>=0) carac = ' e ';
            index2 = bairro.indexOf(','); if(index2>=0) carac = ',';
            index3 = bairro.indexOf(';'); if(index3>=0) carac = ';';
            index4 = bairro.indexOf('.'); if(index4>=0) carac = '.';
            index5 = bairro.indexOf('-'); if(index5>=0) carac = '-';
            let arrBairro = bairro.split(carac);
            bairro = arrBairro[0].toString().trim();
        }
        return bairro;
    }

    getName = function (question='') {
        question = question.toString().trim();
	let nome = '';
	let Default = this.defaultName(question);
	if(Default.length<=0) {
		let start = '';
		if(question.indexOf('Nome')>=0) start = 'Nome';
		if(question.indexOf('nome')>=0) start = 'nome';
		if(question.indexOf('chamo')>=0) start = 'chamo';

		if((start.length>0)&&(question.indexOf('seu')<0)) {
			let indexStart = question.indexOf(start)+start.length+1;

			let index1 = question.indexOf(' e '); if((index1<0)||(index1<indexStart)) index1 = Infinity;
			let index2 = question.indexOf(','); if((index2<0)||(index2<indexStart)) index2 = Infinity;
			let index3 = question.indexOf(';'); if((index3<0)||(index3<indexStart)) index3 = Infinity;
			let index4 = question.indexOf('.'); if((index4<0)||(index4<indexStart)) index4 = Infinity;
			let indexEnd = [
				Math.abs(index1-indexStart),
				Math.abs(index2-indexStart),
				Math.abs(index3-indexStart),
				Math.abs(index4-indexStart)
			].sort((a, b) => a - b)[0]+indexStart;
			if(indexEnd<indexStart) indexEnd = question.length;
			nome = question.substring(indexStart, indexEnd);
			nome = nome.replace(/ é /g, '');
			nome = nome.replace(/:/g, '');
			nome = nome.replace(/[0-9]/g, '').trim();
		}
	}else nome = Default;
	return nome;
}

     getYears = function(question='') {
        question = question.toString().trim();
        question = question.replace(/[^0-9a-zA-Z\s]/g, '');
        let idade = '';
        if(question.indexOf('anos')>0) {
            let arr = question.split(' ');
            let anos = arr[arr.indexOf('anos')-1];
            if((Number(anos)>0)&&(Number(anos)<125)) idade = anos;
        }
        return idade;
    }
    numero = function(_numero='', question='') {
        let Numero = '';
        let idade = this.getYears(question);
        Numero = _numero.toString().trim();
        Numero = Numero.replace(/[^0-9]/g, '');
        if((Numero.length>=1)&&(Numero.length<=4)&&(Numero!=idade)) return Numero;
        else return '';
    }
    
    email = function(_email='') {
        _email = _email.toString().trim();
        _email = _email.replace(/[^0-9a-zA-Z@.-_]/g, '');
        if((_email.indexOf('@')>0)&&(_email.indexOf('.')>0)&&(_email.length>=5)) {
            let c = _email.charAt(_email.length-1);
            if(c=='.') _email = _email.substring(0, _email.length-1);
            return _email;
        }
        else return '';
    }
    
     celular = function(_celular='') {
        _celular = _celular.toString().trim();
        _celular = _celular.replace(/[^0-9]/g, '');
        if(_celular.indexOf('55')==0) _celular = _celular.replace('55', '');
        let _cpf = cpf(_celular);
        if((_celular.length==11)&&(_cpf.length<=0)&&(_celular.indexOf('9')>0)) return _celular;
        else return '';
    }
    
     telefone = function(_telefone='') {
        _telefone = _telefone.toString().trim();
        _telefone = _telefone.replace(/[^0-9]/g, '');
        if(_telefone.indexOf('55')==0) _telefone = _telefone.replace('55', '');
        if(_telefone.length==10) return _telefone;
        else return '';
    }
    
     cep = function(_cep='') {
        _cep = _cep.toString().trim();
        _cep = _cep.replace(/[^0-9]/g, '');
        if(_cep.length!=8) return '';
        else return _cep;
    }
    
     cpf = function(_cpf='') { // 46395485083
        _cpf = _cpf.toString().trim().replace(/\D/g, '');
        if(_cpf.toString().length != 11) return '';
        let result = _cpf;
        [9, 10].forEach(function(j) {
            let soma = 0, r;
            _cpf.split('').splice(0, j).forEach(function(e, i) {
                soma += parseInt(e) * ((j+2)-(i+1));
            });
            r = soma % 11;
            r = (r < 2) ? 0 : 11 - r;
            if(r != _cpf.substring(j, j+1)) result = '';
        });
        return result;
    }
    
     cnpj = function(_cnpj='') { // 31835728000167
        _cnpj = _cnpj.toString().trim().replace(/[^\d]+/g, '');
        if(_cnpj=='') return '';
        if(_cnpj.length!=14) return '';
    
        if(_cnpj == '00000000000000' ||
           _cnpj == '11111111111111' ||
           _cnpj == '22222222222222' ||
           _cnpj == '33333333333333' ||
           _cnpj == '44444444444444' ||
           _cnpj == '55555555555555' ||
           _cnpj == '66666666666666' ||
           _cnpj == '77777777777777' ||
           _cnpj == '88888888888888' ||
           _cnpj == '99999999999999')
           return '';
    
        let tamanho = _cnpj.length-2;
        let numeros = _cnpj.substring(0, tamanho);
        let digitos = _cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho-7;
        for(let i=tamanho; i>=1; i--) {
            soma += numeros.charAt(tamanho-i) * pos--;
            if(pos<2) pos=9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if(resultado != digitos.charAt(0)) return '';
        tamanho = tamanho+1;
        numeros = _cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho-7;
        for(let i=tamanho; i>=1; i--) {
            soma += numeros.charAt(tamanho-i) * pos--;
            if(pos<2) pos=9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if(resultado != digitos.charAt(1)) return '';
    
        return _cnpj;
    }

    } 

    





module.exports = CapturaDeDados