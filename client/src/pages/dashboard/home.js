import React ,{useEffect, useState} from 'react';
import { Grid, Paper} from '@material-ui/core';
import AdminDashboardnav from '../../components/layout/adminnav'
import LeadsHome from './leads';
const Home = () => {
    const [loading, setloading] = useState(false);
    const [page, setPage] = useState({current_page: 1, last_page: 1});

    return (
        <Grid container spacing={2}>
        {
          <Grid item md={2}>
            <Paper>
              {/* <AdminDashboardnav page="projectList"/> */}
            </Paper>
          </Grid>
        }
        <LeadsHome/>

          {/* <Grid item md={10} xs={12} sm={12}>
            <PageTitle isMobile={isMobile} mobileMenu={menu} selected={"Projects"} title={'Posted Projects'}/>
            {
              managers.length > 0 &&
              <ProjectFilter managers={managers} filter={filter} updateData={updateData}/>
            }

            <ListTopBar data={topBarValues}/>

            {
              !loading &&
              projectListData.map((data, index) => (
                <ProjectAdminListItem key={index} data={data} token={props.token} />
              ))
            }
            {
              loading && <SkeletonListLoading />
            }
            {
              !loading && projectListData.length == 0 && <NoRecordFound />
            }
            <Grid item md={12} style={{marginTop: 20}}>
              {page.last_page > 1 ? <Pagination onChange={handlePageChange} style={{justifyContent: 'flex-start', display:'flex'}} defaultPage={1} variant="outlined" shape="rounded" page={page.current_page} count={page.last_page} size={isMobile ? "medium" : "large"}/> : null }
            </Grid>
          </Grid> */}
      </Grid>
    
    )
}

export default Home
