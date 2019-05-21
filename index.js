// Import the module
const readdirp = require('readdirp');
const fs = require('fs');

// pasta que os arquivos serão listados
const root = `${__dirname}/ori`;

// pasta para onde vao os arquivos renomeados
const newPath = `${__dirname}/des`;

const settings = {
    entryType: 'files',
    //filtrando apenas arquivos de extensão pdf
    fileFilter: [ '*.pdf' ],
};

const allFilePaths = [];

// Iterate recursively through a folder
readdirp(root, settings)
	.on('data', function (entry) {
		// executa toda que vez um arquivo e encontrado no diretório e adiciona ao array
		allFilePaths.push(        	
			//pega o caminho do arquivo
			entry.path
		);
	})
	.on('warn', function(warn){
		console.log("Aviso: ", warn);
	})
	.on('error', function(err){
		console.log("Erro: ", err);
	})
	.on('end', function(){
		//console.log(allFilePaths);
		for (let file  of allFilePaths){
			const fileRenamed = 'renomeado - '+file
			//Enviando o caminho do arquivo que queremos renomear e o caminho/nome para sua nova situação
				fs.rename(root+'/'+file, newPath + '/' + fileRenamed, function(err){
					//Caso a execução encontre algum erro
					if(err)
						//A execução irá parar e mostrará o erro
						throw err;
						console.log('#'.repeat(50))
						console.log(`nome antigo: ${file}`);
						console.log(`nome novo: ${fileRenamed}`);
				});
		}
	});