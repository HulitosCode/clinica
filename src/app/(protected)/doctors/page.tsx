import { Button } from "@/components/ui/button";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

const DoctorsPage = () => {
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