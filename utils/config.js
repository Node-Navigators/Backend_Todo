const secretKey = process.env.Secret_Key;

export default function() {
    
    
    if (!secretKey) {
        console.log('FATAL ERROR:jwtPrivateKey is not defined.');
        process.exit(1);
        process.exit(0); 
    }
    
}