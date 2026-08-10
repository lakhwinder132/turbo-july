export const dynamic = 'force-dynamic';

import prismaClient from "@repo/db/client";


export default async function yes(){
  const data =await prismaClient.user.findMany();
  return (<div>
    {data.map((user) => (
      <div key={user.id}>{user.username} {user.password}</div>
    ))}
  </div>);
}

