
import app from "./app";
import { envVers } from "./config/env";


// Start the server


const bootstrap=()=>{
    try{
    //    app.listen(process.env.PORT, () => {
    //     console.log(`Server is running on http://localhost:${process.env.PORT}`);
    app.listen(envVers.PORT, () => {
        console.log(`Server is running on http://localhost:${envVers.PORT}`);
});
    }catch(err){
        console.error('Error occurred while bootstrapping the application:', err);
    }
}

bootstrap();