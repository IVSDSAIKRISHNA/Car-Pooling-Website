using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ResponseBase<T>
    {
        public string ErrorMessage { get; set; }
        public T Response { get; set; }

    }
}
