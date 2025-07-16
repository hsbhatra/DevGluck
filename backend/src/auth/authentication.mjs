// import jwt from 'jsonwebtoken'
// import userModel from '../models/userModel.mjs';
// import { secretMessage } from '../../config.mjs'
// const authentication= async(req,res,next)=>{
//     try {
//         let token = req.header("authorization");
//         token =token.replace("Bearer ","");
//         // console.log(token)
//         let payload=  jwt.verify(token, secretMessage,(err,decodedToken)=>{
//             if(err){
//                 return res.status(401).send({status:"failed", message:"authentication failed"});
//             }
//             return decodedToken;
//         })
//         req.payload= payload;
//         next();
        
//     } catch (error) {
//         return res.status(500).send({status:"failed", message: error.message})
//     }
// }
// const authorization= async(req,res,next)=>{
//     try {
//         let id= req.params.userid;
//         let userId= req.payload.id;
//         if(id!=userId){
//             return res.status(403).send({status:"failed", message:"authorization failed"});
//         }else{
//             let user= await userModel.findById(id);
//             let role=user.role;
//             if(role!=='admin'){
//                 return res.status(403).send({status:"failed", message:"you are not allowed to edit details"});
//             }
//         }
//         next();

//     } catch (error) {
//         return res.status(500).send({status:"failed", message: error.message})
//     }
// }
// export {authentication, authorization};