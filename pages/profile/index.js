import { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";



const ContestIndex = () => {

const { data: session, status } = useSession();

const router = useRouter();

useEffect(()=>{},[])

  useEffect(() => {
    // Always do navigations after the first render
    router.push("/profile/" + session.user.name , undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);
  return <></>;
};

// export async function getServerSideProps(context) {
//   const { page } = context.query;
//   const data = await fetch(
//     `${process.env.HOSTNAME}/api/partner/${page}?take=${16}`,
//     {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     }
//   ).then((response) => {
//     return response.json();
//   });
//   return { props: { data } };
// }

export default ContestIndex;
