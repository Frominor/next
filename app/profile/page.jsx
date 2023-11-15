import { getServerSession } from "next-auth/next";
import { authConfig } from "../../config/config";
export default async function Profile() {
  const session = await getServerSession(authConfig);
  console.log(session);
  return (
    <div className="Profile">
      <h1 style={{ margin: 0 }}>{session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
      <img src={session?.user?.image}></img>
    </div>
  );
}
