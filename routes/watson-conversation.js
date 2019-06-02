const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const router = express.Router();

const assistant = new AssistantV1({
  iam_apikey: 'ntG1vmrmd8BL4e-sBpiFlyUYc0q2PinCjIrO9UrlCCRs',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2019-05-30',
});

router.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'4286ba66-e135-4259-b43f-452dfce1b0c4',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(response);
    }
  });
});

module.exports = router;