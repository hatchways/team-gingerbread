import { useState, useEffect, ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useStyles from './useStyles';
import EditProfileTab from './EditProfileTab/EditProfileTab';
import ProfilePhotoTab from './ProfilePhotoTab/ProfilePhotoTab';
import PaymentTab from './PaymentTab/PaymentTab';

const stripePromise = loadStripe(
  'pk_test_51K4XCnKf5QktJZn3GrBXfSwbcgATNhC6MATEhDqM2T1q6jWFMhC4pA7hom84oWVSQWOMC5F3rjd2twAMa4Lnrktn00Yb6ixDo8',
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p="3">
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const EditMenu = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [clientSecret, setClientSecret] = useState('');

  const handleChange = (event: ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   fetch('/stripe/create-payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: 'test' }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={6} md={2} lg={2} className={classes.tabContainer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          className={classes.tabs}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Profile Photo" {...a11yProps(1)} />
          <Tab label="Availability" {...a11yProps(2)} />
          <Tab label="Payment" {...a11yProps(3)} />
          <Tab label="Security" {...a11yProps(4)} />
          <Tab label="Settings" {...a11yProps(5)} />
        </Tabs>
      </Grid>
      <Grid item xs={6} md={6} lg={6} component={Paper} className={classes.tabComponents}>
        <TabPanel value={value} index={0}>
          <EditProfileTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfilePhotoTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Availability Placeholder
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
            <PaymentTab />
          </Elements>
        </TabPanel>
        <TabPanel value={value} index={4}>
          Security Placeholder
        </TabPanel>
        <TabPanel value={value} index={5}>
          Settings Placeholder
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default EditMenu;
