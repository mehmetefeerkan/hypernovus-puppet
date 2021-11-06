# hypernovus-puppet-aws
Layer 7 Python Flooding script hypervisor for AWS EC2 Ubuntu 18.04 systems, packed with an autoinstaller script.

The system requires basically nothing else but hardware. A single t2.micro does the trick up to 1000 requests/second even with a shi**y script.

<!-- USAGE EXAMPLES -->

## Single-Command-Installation
   ```sh
   cd /; wget https://raw.githubusercontent.com/mehmetefeerkan/hypernovus-puppet/main/initl7.sh; chmod +x initl7.sh; ./initl7.sh
   ```
## Usage

  Let's say you want to attack your OWN website 'your-frickin-really-nice-website.com', and you've just set the system up to a server on IP 31.32.33.34; here's how you start an attack:
  ```
  http://31.32.33.34:3000/layer7/yourwebsite.com/10
  ```

## F O R _ E D U C A T I O N A L _ P U R P O S E S _ O N L Y 
