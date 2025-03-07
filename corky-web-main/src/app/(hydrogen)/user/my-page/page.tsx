'use client';

import ProfileHeader from '@/app/shared-corky/profile/profile-header';
import ProfileDetails from '@/app/shared-corky/profile/user-details';

import { metaObject } from '@/config/site.config';

import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';

import PageHeader from '@/app/shared-corky/page-header';

import DeletePopover from '@/app/shared-corky/delete-popover-large';

import { useRouter } from 'next/navigation';


import { PiList } from 'react-icons/pi';


import { Modal } from '@/components/ui/modal';
import { Title, Text } from '@/components/ui/text';


import { useState, useEffect } from 'react';


import { useSession, signOut } from 'next-auth/react';



/*
export const metadata = {
  ...metaObject('상세보기'),
};
*/


const pageHeader = {
  title: '나의 정보',
  breadcrumb: [
    {
      href: "/",
      name: '홈',
    },
    {
      name: '나의 정보',
    },
  ],
};


const modalData = {
  title: '',
  description: '',
  data: [],
};



export default function ProfilePage() {




  const { data: session } = useSession(); // pre-fetch session data


  ///console.log("use-table-products session:", session);

    /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
    avatar: "",
    shopId: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoadingUserData(true);

      const res = await fetch(`/api/corky/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      

      const data = json as any;

      ///console.log('data ->', data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);  


  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  

  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>


      </PageHeader>


            
      <div className="@container  ">
  
      
        {/*}
        <ProfileHeader id={id}/>
        */}
        <ProfileDetails id={userData?.id}/>
      </div>


      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex flex-col items-center justify-center gap-10 m-5">
            {/*
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
        
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-base font-semibold text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                setActive(() => 'posts');
              }}
              className="h-auto px-1 py-1"
            >
              <PiXBold className="h-5 w-5 text-base" />
            </Button>
            */}
            {/* close button */}
            <Button
              size="lg"
              color="primary"
              className='flex items-center space-x-2'
              onClick={() => {
                setOpen(false);
                //setActive(() => 'posts');
              }}
            >
              Close
            </Button>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>


      
    </>
  );
}
