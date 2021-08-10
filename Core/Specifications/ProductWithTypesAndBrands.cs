using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrands : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrands()
        {
            AddInclude(x=> x.ProductType);
            AddInclude(x=> x.ProductBrand);
        }

        public ProductWithTypesAndBrands(int id) : base(x => x.Id == id)
        {
            AddInclude(x=> x.ProductType);
            AddInclude(x=> x.ProductBrand);

        }
    }
}