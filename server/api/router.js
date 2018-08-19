import action from "./action";

export default(model,router,permission,actions) => {
    router
        .get('/'+model+'s' ,actions.find)
        .post('/'+model+'s',permission,actions.create)
        // .post('/'+model+'s',actions.create)
        .get('/'+model+'s/:id',actions.findById)
        .put('/'+model+'s/:id',permission,actions.updateById)
        // .put('/'+model+'s/:id',actions.updateById)
        .delete('/'+model+'s/:id',permission,actions.deleteById)
        // .delete('/'+model+'s/:id',actions.deleteById)
}