import CircularProgress from '@mui/material/CircularProgress';

export const WithLoading = (Component:any) => {
  return ({ loading = false, ...props }) => {
    if (!loading) return (<Component {...props} />);
    return (<CircularProgress color="secondary" />);
  }
}
