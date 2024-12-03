import ax from "../../utils/ax"

export default async function getProfile(){
try {
    const result = await ax.get("/profile")
    return result.data
} catch (error) {
    console.log(error)
}
}