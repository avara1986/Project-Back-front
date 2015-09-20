# encoding: utf-8
from selenium import webdriver
import requests
import unittest
from time import sleep
import os
import random


class BaseTest(unittest.TestCase):
    host = 'http://192.168.100.3:8000'

    def setUp(self):  # 3
        self.browser = webdriver.Firefox()

    def tearDown(self):  # 3
        self.browser.quit()


class ServerTests(BaseTest):
    def test_server_is_up(self):

        # self.browser.get(self.host)
        r = requests.get(self.host)
        self.assertEqual(r.status_code, 404)


if __name__ == '__main__':
    unittest.main()
