import DialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";

const StyledDialogActions = withStyles((theme) => ({
  root: {
    padding: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
}))(DialogActions);

export default StyledDialogActions;
