export default async function UserProfile({params}:any){
    const {id} = await params;
    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <h1 className="text-4xl font-bold text-white">
                Welcome to {id}'s profile!
            </h1>
        </div>
    )
}