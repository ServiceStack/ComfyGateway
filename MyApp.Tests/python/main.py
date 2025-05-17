#!/usr/bin/env python3

from dtos import *
from servicestack.clients import UploadFile
from servicestack import JsonServiceClient, printdump

client = JsonServiceClient("http://localhost:5000")
client.bearer_token = "ak-f788a19671a446babf1758dce0439451"

print(client.send(Hello(name="World")).result)

with open("object_info.json", "rb") as object_info_file:
    try:
        response = client.post_file_with_request(
            request=RegisterComfyAgent(device_id="900f99a763b94a6e91d0c0b73827b5c3"),
            file=UploadFile(
                field_name="object_info",
                file_name="object_info.json",
                content_type="application/json",
                stream=object_info_file
            ))
        printdump(response)
    except WebServiceException as e:
        print(e)
        printdump(e.response_status)
