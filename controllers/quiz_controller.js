var models =require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load=function (req, res,next,quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz=quiz;
				next();
			} else { next(Error('No existe quizId=' + quizId));}
		}
	).catch(function(error){next(error);});
};
// GET /author
exports.author=function(req,res) {
res.render('quizes/author',{autor: 'Carlos Reyero'});
};

// GET /quizes/question
exports.question=function(req,res) {
models.Quiz.findAll().success(function(quiz) {
res.render('quizes/question',{pregunta: quiz[0].pregunta})
})
};

// GET /quizes
exports.index = function(req,res) {
//models.Quiz.findAll({where: ["pregunta like ?", search]}).success(function(quiz) {
//models.Quiz.findAll({order: 'pregunta DESC'}).success(function(quiz)
//	 models.Quiz.findAll().then(function(quiz) {
models.Quiz.findAll({where: ["pregunta like ?", '%' +req.query.search + '%']},{order: 'pregunta'}).then(function(quiz) {
   res.render('quizes/index', {quiz: quiz});
	 }).catch(function(error) {next(error);});
};

// GET /quizes/:id
exports.show = function(req,res){
//	models.Quiz.find(req.params.quizId).then(function(quiz){
//		res.render('quizes/show',{quiz:quiz});
		res.render('quizes/show',{quiz:req.quiz});
//	});
};

// GET /quizes/:id/answer
exports.answer = function(req,res){
//	models.Quiz.find(req.params.quizId).then(function(quiz){
//    if (req.query.respuesta === quiz.respuesta) {
//			 res.render('quizes/answer',
//		               {quiz: quiz,respuesta: 'Correcto'});
//		} else {
//			res.render('quizes/answer',
//									{quiz: quiz,respuesta: 'Incorrecto'});
//		}
//	});
var resultado = 'Incorrecto';
if (req.query.respuesta ===req.quiz.respuesta) {
	resultado = 'Correcto';
}
res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
};

//GET /quizes/new
exports.new = function (req,res) {
	var quiz = models.Quiz.build ( // Crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build(req.body.quiz);

// guarda en DB los campos pregunta y respuesta de quiz
quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
	res.redirect('/quizes');
}) // Redirección HTTP ( URL relativo) lista de preguntas
};

// GET /quizes/question
//exports.question=function(req,res) {
//res.render('quizes/question',{pregunta: 'Capital de Italia'});
//};

// GET /quizes/answer
//exports.answer = function(req,res){
//	models.Quiz.findAll().success(function(quiz){
//    if (req.query.respuesta === quiz[0].respuesta) {
//  			 res.render('quizes/answer', {respuesta: 'Correcto'});
//		} else {
//			res.render('quizes/answer',	{respuesta: 'Incorrecto'});
//		}
//	});
//};

// GET /quizes/answer
//exports.answer= function(req,res) {
//	if (req.query.respuesta === 'Roma') {
//	   res.render('quizes/answer',{respuesta: 'Correcto'});
//	} else {
//	   res.render('quizes/answer',{respuesta: 'Incorrecto'});
//	}
//};
