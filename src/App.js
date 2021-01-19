import React, { useState } from 'react';

// reactstrap components
import { Alert, Col, Button, Form, FormGroup, Label, Input, Container } from "reactstrap";


const AlertPrivacyPolicyAcceptance = (props) => {
  return (
    <React.Fragment>
      <Alert color="danger">
        You must accept the terms and conditions before the search terms will be processed.
      </Alert>
    </React.Fragment>
  );
}


export const App = (props) => {

  const [term, setTerm] = useState("");
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleTermChange = (e) => {
    console.log("handleTermChange(): e=", { e });
    setTerm(e.target.value);
  }

  const handleSearch = (e) => {
    if (showAlert) { setShowAlert(false); }
    console.log("handleSearch(): e=", { e });
    console.log("handleSearch(): FAKE sending search term to remote server... Term: ", term);
  }

  const handleEnter = (e) => {
    if (e.key === 13) {
      if (submitButtonDisabled === false) {
        handleSearch();
      } else {
        setShowAlert(true);
        console.log("handleEnter(): Blocking ENTER as privacy policy is not accepted");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Placing this here prevents the form from being cleared.
    if (submitButtonDisabled === false) {
      console.log("handleSubmit(): e=", { e });
      handleSearch();
    } else {
      setShowAlert(true);
      console.log("handleSubmit(): Blocking ENTER as privacy policy is not accepted");
    }
  }

  const handleAcceptPrivacyPolicyStateChange = (e) => {
    console.log("handleAcceptPrivacyPolicyStateChange(): e=", { e });
    setPrivacyPolicyAccepted(!privacyPolicyAccepted);
    setSubmitButtonDisabled(!submitButtonDisabled);
    if (showAlert) { setShowAlert(false); }
  }

  return (
    <React.Fragment>
      <Container>
        <Col xs="0" md="4"></Col>
        <Col xs="12" md="4">
          <Form className="searchbox" onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="searchId" sm={2}>
                Search Engine
        </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  placeholder="Enter search terms"
                  onChange={handleTermChange}
                  onKeyDown={handleEnter}
                />
              </Col>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={handleAcceptPrivacyPolicyStateChange} />{' '}
          Confirm you have read and agree with the privacy policy (for demo purposes only)
        </Label>
            </FormGroup>

            <FormGroup>
              <Col sm="2">
                <div className="">
                  <Button
                    onClick={handleSearch}
                    className="btn"
                    disabled={submitButtonDisabled}
                  >
                    Submit
            </Button>
                </div>
              </Col>
            </FormGroup>
          </Form>
          {showAlert ? <AlertPrivacyPolicyAcceptance /> : null}
        </Col>
        <Col xs="0" md="4"></Col>
      </Container>
    </React.Fragment>
  );
}

export default App;
