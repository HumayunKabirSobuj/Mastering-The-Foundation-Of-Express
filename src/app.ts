import express, { NextFunction, Request, Response } from "express"
const app = express()
app.use(express.json())
app.use(express.text())

//middleware

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url, req.method, req.hostname)
    next()
}

//create router

const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/api/v1/users', userRouter)
app.use('/api/v1/courses', courseRouter)

userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);

    res.json({
        success: true,
        message: "User is create successfully",
        data: user
    })

})

courseRouter.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course)
    res.json({
        success: true,
        message: 'Course Created successfully',
        data: course
    })
})





app.get('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(something)
    } catch (error) {
        next(error)
    }
})

app.post('/', logger, (req: Request, res: Response) => {
    console.log(req.body);
    res.json({
        message: "Data Added Succesfully"
    })
})



//custom error handler

app.all('*', (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: "Something went wrong"
    })
})


//global error handler

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
})


export default app;