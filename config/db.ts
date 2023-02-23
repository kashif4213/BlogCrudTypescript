import { set, connect } from 'mongoose';
const connectDB = async () => {
    try {
        //strict query flag ensures the values are inserted to schema
        set("strictQuery", false);
        const conn : any = await connect('mongodb+srv://rkashif96:Pakistan4213@cluster0.p64xjvr.mongodb.net/?retryWrites=true&w=majority')
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}