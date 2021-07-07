from web3 import Web3, contract
import json
import time

with open('../solidity/build/contracts/Product.json','r') as f:
    abi = json.load(f)['abi']

w3 = Web3( Web3.WebsocketProvider('ws://127.0.0.1:7545') )

print( w3.isConnected() )

contract = w3.eth.contract(abi=abi)

events = contract.events.RecallEvent().createFilter(fromBlock="0x0")

while True:
    for event in events.get_new_entries():
        print( event )

    time.sleep(5)

# from web3.auto import Web3
# import time

# def handle_event(event):
#     print(event)

# def log_loop(event_filter, poll_interval):
#     while True:
#         for event in event_filter.get_new_entries():
#             handle_event(event)
#         time.sleep(poll_interval)

# def main():
#     w3 = Web3( Web3.WebsocketProvider('ws://127.0.0.1:7545') )
#     block_filter = w3.eth.filter('latest')
#     log_loop(block_filter, 2)

# if __name__ == '__main__':
#     main()