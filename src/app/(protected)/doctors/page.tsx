import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

const DoctorsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        redirect("/authentication")
    }

    if (!session.user.clinic) {
        redirect("/clinic-form")
    }

    return ( 
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Medicos</PageTitle>
                    <PageDescription>Gerencie os medicos da sua clinica</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    {/* <AddDoctorButton /> */}
                    <Button>Adicionar medicos</Button>
                </PageActions>
            </PageHeader>
            <PageContent>
                <h1>Doctors</h1>
            </PageContent>
        </PageContainer>
     );
}
 
export default DoctorsPage;