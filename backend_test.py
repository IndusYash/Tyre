#!/usr/bin/env python3
"""
Backend API Test Suite for Tyra Décor Catalogue
Tests the bug fix: All products must have availability: "In Stock"
"""

import requests
import json
import sys

# Base URL for testing
BASE_URL = "http://localhost:3000"

def print_test_header(test_num, description):
    """Print a formatted test header"""
    print(f"\n{'='*80}")
    print(f"TEST {test_num}: {description}")
    print(f"{'='*80}")

def test_1_health_check():
    """Test 1: GET /api/health - should return { ok: true, brand: 'Tyra Decor' }"""
    print_test_header(1, "Health Check")
    try:
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            
            if data.get('ok') == True and 'Tyra' in data.get('brand', ''):
                print("✅ TEST 1 PASSED: Health check successful")
                return True
            else:
                print(f"❌ TEST 1 FAILED: Expected ok=true and brand containing 'Tyra', got {data}")
                return False
        else:
            print(f"❌ TEST 1 FAILED: Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ TEST 1 FAILED: Exception occurred - {str(e)}")
        return False

def test_2_all_products_in_stock():
    """Test 2: GET /api/products - must return exactly 39 products, ALL with availability === "In Stock" """
    print_test_header(2, "All Products Must Be 'In Stock'")
    try:
        response = requests.get(f"{BASE_URL}/api/products", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ TEST 2 FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        products = data.get('products', [])
        total_count = len(products)
        
        print(f"Total products returned: {total_count}")
        
        if total_count != 39:
            print(f"❌ TEST 2 FAILED: Expected exactly 39 products, got {total_count}")
            return False
        
        # Check EVERY product has availability === "In Stock"
        failed_products = []
        for product in products:
            sku = product.get('sku', 'UNKNOWN')
            availability = product.get('availability', 'MISSING')
            if availability != "In Stock":
                failed_products.append({
                    'sku': sku,
                    'name': product.get('name', 'UNKNOWN'),
                    'availability': availability
                })
        
        if failed_products:
            print(f"❌ TEST 2 FAILED: {len(failed_products)} products do NOT have 'In Stock':")
            for p in failed_products:
                print(f"  - {p['sku']} ({p['name']}): availability = '{p['availability']}'")
            return False
        else:
            print(f"✅ TEST 2 PASSED: All 39 products have availability = 'In Stock'")
            return True
            
    except Exception as e:
        print(f"❌ TEST 2 FAILED: Exception occurred - {str(e)}")
        return False

def test_3_suites_category_in_stock():
    """Test 3: GET /api/products?category=suites - must return 16 products, all "In Stock" """
    print_test_header(3, "Suites Category - All Must Be 'In Stock'")
    try:
        response = requests.get(f"{BASE_URL}/api/products?category=suites", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ TEST 3 FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        products = data.get('products', [])
        total_count = len(products)
        
        print(f"Total suites returned: {total_count}")
        
        if total_count != 16:
            print(f"❌ TEST 3 FAILED: Expected exactly 16 suites, got {total_count}")
            return False
        
        # Check EVERY suite has availability === "In Stock"
        failed_suites = []
        for product in products:
            sku = product.get('sku', 'UNKNOWN')
            availability = product.get('availability', 'MISSING')
            if availability != "In Stock":
                failed_suites.append({
                    'sku': sku,
                    'name': product.get('name', 'UNKNOWN'),
                    'availability': availability
                })
        
        if failed_suites:
            print(f"❌ TEST 3 FAILED: {len(failed_suites)} suites do NOT have 'In Stock':")
            for p in failed_suites:
                print(f"  - {p['sku']} ({p['name']}): availability = '{p['availability']}'")
            return False
        else:
            print(f"✅ TEST 3 PASSED: All 16 suites have availability = 'In Stock'")
            # Print all suite SKUs for verification
            suite_skus = [p.get('sku') for p in products]
            print(f"Suite SKUs: {', '.join(suite_skus)}")
            return True
            
    except Exception as e:
        print(f"❌ TEST 3 FAILED: Exception occurred - {str(e)}")
        return False

def test_4_chairs_category_in_stock():
    """Test 4: GET /api/products?category=chairs - must return 6 products, all "In Stock" """
    print_test_header(4, "Chairs Category - All Must Be 'In Stock'")
    try:
        response = requests.get(f"{BASE_URL}/api/products?category=chairs", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ TEST 4 FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        products = data.get('products', [])
        total_count = len(products)
        
        print(f"Total chairs returned: {total_count}")
        
        if total_count != 6:
            print(f"❌ TEST 4 FAILED: Expected exactly 6 chairs, got {total_count}")
            return False
        
        # Check EVERY chair has availability === "In Stock"
        failed_products = []
        for product in products:
            sku = product.get('sku', 'UNKNOWN')
            availability = product.get('availability', 'MISSING')
            if availability != "In Stock":
                failed_products.append({
                    'sku': sku,
                    'name': product.get('name', 'UNKNOWN'),
                    'availability': availability
                })
        
        if failed_products:
            print(f"❌ TEST 4 FAILED: {len(failed_products)} chairs do NOT have 'In Stock':")
            for p in failed_products:
                print(f"  - {p['sku']} ({p['name']}): availability = '{p['availability']}'")
            return False
        else:
            print(f"✅ TEST 4 PASSED: All 6 chairs have availability = 'In Stock'")
            return True
            
    except Exception as e:
        print(f"❌ TEST 4 FAILED: Exception occurred - {str(e)}")
        return False

def test_5_tables_category_in_stock():
    """Test 5: GET /api/products?category=tables - must return 4 products, all "In Stock" """
    print_test_header(5, "Tables Category - All Must Be 'In Stock'")
    try:
        response = requests.get(f"{BASE_URL}/api/products?category=tables", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ TEST 5 FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        products = data.get('products', [])
        total_count = len(products)
        
        print(f"Total tables returned: {total_count}")
        
        if total_count != 4:
            print(f"❌ TEST 5 FAILED: Expected exactly 4 tables, got {total_count}")
            return False
        
        # Check EVERY table has availability === "In Stock"
        failed_products = []
        for product in products:
            sku = product.get('sku', 'UNKNOWN')
            availability = product.get('availability', 'MISSING')
            if availability != "In Stock":
                failed_products.append({
                    'sku': sku,
                    'name': product.get('name', 'UNKNOWN'),
                    'availability': availability
                })
        
        if failed_products:
            print(f"❌ TEST 5 FAILED: {len(failed_products)} tables do NOT have 'In Stock':")
            for p in failed_products:
                print(f"  - {p['sku']} ({p['name']}): availability = '{p['availability']}'")
            return False
        else:
            print(f"✅ TEST 5 PASSED: All 4 tables have availability = 'In Stock'")
            return True
            
    except Exception as e:
        print(f"❌ TEST 5 FAILED: Exception occurred - {str(e)}")
        return False

def test_6_planters_category_in_stock():
    """Test 6: GET /api/products?category=planters - must return 13 products, all "In Stock" """
    print_test_header(6, "Planters Category - All Must Be 'In Stock'")
    try:
        response = requests.get(f"{BASE_URL}/api/products?category=planters", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ TEST 6 FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        products = data.get('products', [])
        total_count = len(products)
        
        print(f"Total planters returned: {total_count}")
        
        if total_count != 13:
            print(f"❌ TEST 6 FAILED: Expected exactly 13 planters, got {total_count}")
            return False
        
        # Check EVERY planter has availability === "In Stock"
        failed_products = []
        for product in products:
            sku = product.get('sku', 'UNKNOWN')
            availability = product.get('availability', 'MISSING')
            if availability != "In Stock":
                failed_products.append({
                    'sku': sku,
                    'name': product.get('name', 'UNKNOWN'),
                    'availability': availability
                })
        
        if failed_products:
            print(f"❌ TEST 6 FAILED: {len(failed_products)} planters do NOT have 'In Stock':")
            for p in failed_products:
                print(f"  - {p['sku']} ({p['name']}): availability = '{p['availability']}'")
            return False
        else:
            print(f"✅ TEST 6 PASSED: All 13 planters have availability = 'In Stock'")
            return True
            
    except Exception as e:
        print(f"❌ TEST 6 FAILED: Exception occurred - {str(e)}")
        return False

def test_7_specific_suite_search():
    """Test 7: GET /api/products?search=Sovereign - must return suite with "In Stock" """
    print_test_header(7, "Specific Suite Search (Sovereign) - Must Be 'In Stock'")
    try:
        response = requests.get(f"{BASE_URL}/api/products?search=Sovereign", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ TEST 7 FAILED: Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        products = data.get('products', [])
        
        print(f"Products matching 'Sovereign': {len(products)}")
        
        if len(products) == 0:
            print(f"❌ TEST 7 FAILED: No products found matching 'Sovereign'")
            return False
        
        # Check the Sovereign Suite specifically
        sovereign_suite = None
        for product in products:
            if product.get('sku', '').startswith('TD-SU-'):
                sovereign_suite = product
                break
        
        if not sovereign_suite:
            print(f"❌ TEST 7 FAILED: No suite (SKU starting with TD-SU-) found in search results")
            return False
        
        sku = sovereign_suite.get('sku', 'UNKNOWN')
        name = sovereign_suite.get('name', 'UNKNOWN')
        availability = sovereign_suite.get('availability', 'MISSING')
        
        print(f"Found: {sku} - {name}")
        print(f"Availability: {availability}")
        
        if availability != "In Stock":
            print(f"❌ TEST 7 FAILED: {sku} has availability = '{availability}', expected 'In Stock'")
            return False
        else:
            print(f"✅ TEST 7 PASSED: {sku} has availability = 'In Stock'")
            return True
            
    except Exception as e:
        print(f"❌ TEST 7 FAILED: Exception occurred - {str(e)}")
        return False

def test_8_enquiry_submission():
    """Test 8: POST /api/enquiries - should return 201 and echo an id """
    print_test_header(8, "Enquiry Submission")
    try:
        payload = {
            'name': 'Test User',
            'email': 't@t.com',
            'phone': '9999999999',
            'message': 'Hi, this is a test enquiry'
        }
        
        response = requests.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 201:
            print(f"❌ TEST 8 FAILED: Expected status 201, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        # Check for id in root or nested in 'enquiry' object
        has_id = ('id' in data or '_id' in data or 
                  ('enquiry' in data and ('id' in data['enquiry'] or '_id' in data['enquiry'])))
        
        if has_id:
            print(f"✅ TEST 8 PASSED: Enquiry created successfully with ID")
            return True
        else:
            print(f"❌ TEST 8 FAILED: Response does not contain 'id' field")
            return False
            
    except Exception as e:
        print(f"❌ TEST 8 FAILED: Exception occurred - {str(e)}")
        return False

def test_9_admin_verify():
    """Test 9: POST /api/admin/verify - correct password should return 200, wrong should return 401 """
    print_test_header(9, "Admin Password Verification")
    
    # Test with correct password
    try:
        payload_correct = {'password': 'tyra2025'}
        response_correct = requests.post(f"{BASE_URL}/api/admin/verify", json=payload_correct, timeout=10)
        print(f"Correct password - Status Code: {response_correct.status_code}")
        
        if response_correct.status_code != 200:
            print(f"❌ TEST 9 FAILED: Expected status 200 for correct password, got {response_correct.status_code}")
            return False
        
        data_correct = response_correct.json()
        print(f"Correct password - Response: {json.dumps(data_correct, indent=2)}")
        
        if data_correct.get('ok') != True:
            print(f"❌ TEST 9 FAILED: Expected ok=true for correct password, got {data_correct}")
            return False
        
        print("✅ Correct password verification passed")
        
    except Exception as e:
        print(f"❌ TEST 9 FAILED: Exception with correct password - {str(e)}")
        return False
    
    # Test with wrong password
    try:
        payload_wrong = {'password': 'wrongpassword'}
        response_wrong = requests.post(f"{BASE_URL}/api/admin/verify", json=payload_wrong, timeout=10)
        print(f"Wrong password - Status Code: {response_wrong.status_code}")
        
        if response_wrong.status_code != 401:
            print(f"❌ TEST 9 FAILED: Expected status 401 for wrong password, got {response_wrong.status_code}")
            return False
        
        print("✅ Wrong password correctly rejected with 401")
        print(f"✅ TEST 9 PASSED: Admin verification working correctly")
        return True
        
    except Exception as e:
        print(f"❌ TEST 9 FAILED: Exception with wrong password - {str(e)}")
        return False

def main():
    """Run all tests and report results"""
    print("\n" + "="*80)
    print("TYRA DÉCOR BACKEND API TEST SUITE")
    print("Bug Fix Verification: All Products Must Be 'In Stock'")
    print("="*80)
    
    results = {
        'Test 1 - Health Check': test_1_health_check(),
        'Test 2 - All Products In Stock': test_2_all_products_in_stock(),
        'Test 3 - Suites Category In Stock': test_3_suites_category_in_stock(),
        'Test 4 - Chairs Category In Stock': test_4_chairs_category_in_stock(),
        'Test 5 - Tables Category In Stock': test_5_tables_category_in_stock(),
        'Test 6 - Planters Category In Stock': test_6_planters_category_in_stock(),
        'Test 7 - Specific Suite Search': test_7_specific_suite_search(),
        'Test 8 - Enquiry Submission': test_8_enquiry_submission(),
        'Test 9 - Admin Verification': test_9_admin_verify(),
    }
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = 0
    failed = 0
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{status} - {test_name}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print("\n" + "="*80)
    print(f"TOTAL: {passed} passed, {failed} failed out of {len(results)} tests")
    print("="*80)
    
    # Exit with appropriate code
    if failed > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()
