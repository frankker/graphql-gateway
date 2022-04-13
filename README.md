# WFM Graph Gateway

## Technical document

Please find the [architecture overview](https://confluence.hilti.com/display/BUTSWM/02+-+Backend+Architecture) on Hilti confluence.
### Environment Variables

To run the docker image we have to set following environment variables. Please
note, the default port must be changed to `8080` to support our OnTrackOperator
today.

    docker run --rm -it \
        -e WFM_TNA_GRAPHQL_ENDPOINT=https://hc-apigw-d.hilti.com/ts/workforce-dev/tna/v1/graphql \
        -e CCMS_GRAPHQL_ENDPOINT=https://hc-apigw-d.hilti.com/ts/workforce-dev/graph-hc/v1/graphql \
        registry.asmgmt.hilti.com/buts/wfm/wfm-orchestration:latest
